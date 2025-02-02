use miette::IntoDiagnostic;
use moon_common::consts::CONFIG_DIRNAME;
use moon_logger::debug;
use moon_utils::is_test_env;
use moon_utils::semver::Version;
use serde::{Deserialize, Serialize};
use starbase_utils::{dirs, fs};
use std::env;
use std::fs::OpenOptions;
use std::path::Path;
use std::time::{Duration, SystemTime};
use uuid::Uuid;

const CURRENT_VERSION_URL: &str = "https://launch.moonrepo.app/versions/cli/current";
const ALERT_PAUSE_DURATION: Duration = Duration::from_secs(43200); // 12 hours

#[derive(Debug, Default, Deserialize, Serialize)]
#[serde(default)]
pub struct CurrentVersion {
    pub current_version: String,
    pub message: Option<String>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct CheckState {
    pub last_alert: SystemTime,
}

fn load_or_create_anonymous_uid() -> miette::Result<String> {
    let moon_home_dir = dirs::home_dir()
        .expect("Invalid home directory.")
        .join(CONFIG_DIRNAME);
    let id_path = moon_home_dir.join("id");

    if id_path.exists() {
        return Ok(fs::read_file(id_path)?);
    }

    let id = Uuid::new_v4().to_string();

    fs::create_dir_all(&moon_home_dir)?;
    fs::write_file(id_path, &id)?;

    Ok(id)
}

fn create_anonymous_rid(workspace_root: &Path) -> String {
    moon_utils::hash(
        env::var("MOONBASE_REPO_SLUG")
            .or_else(|_| env::var("MOON_REPO_SLUG"))
            .unwrap_or_else(|_| fs::file_name(workspace_root)),
    )
}

pub async fn check_version(
    local_version_str: &str,
    bypass_cache: bool,
) -> miette::Result<Option<CurrentVersion>> {
    let moon_dir = fs::find_upwards(
        CONFIG_DIRNAME,
        env::current_dir().expect("Invalid working directory."),
    );

    if is_test_env() || proto::is_offline() || moon_dir.is_none() {
        return Ok(None);
    }

    let moon_dir = moon_dir.unwrap();
    let workspace_root = moon_dir.parent().unwrap().to_path_buf();
    let check_state_path = moon_dir.join("cache/states/versionCheck.json");
    let now = SystemTime::now();

    // Only check once every 12 hours
    if let Ok(file) = fs::read_file(&check_state_path) {
        let check_state: Result<CheckState, _> = serde_json::from_str(&file);

        if let Ok(state) = check_state {
            if (state.last_alert + ALERT_PAUSE_DURATION) > now && !bypass_cache {
                return Ok(None);
            }
        }
    }

    debug!(target: "moon:launchpad", "Checking for new version of moon");

    let response = reqwest::Client::new()
        .get(CURRENT_VERSION_URL)
        .header("X-Moon-Version", local_version_str)
        .header("X-Moon-CI", ci_env::is_ci().to_string())
        .header(
            "X-Moon-CI-Provider",
            format!("{:?}", ci_env::detect_provider()),
        )
        .header("X-Moon-CD", cd_env::is_cd().to_string())
        .header(
            "X-Moon-CD-Provider",
            format!("{:?}", cd_env::detect_provider()),
        )
        .header("X-Moon-UID", load_or_create_anonymous_uid()?)
        .header("X-Moon-RID", create_anonymous_rid(&workspace_root))
        .send()
        .await
        .into_diagnostic()?
        .text()
        .await
        .into_diagnostic()?;

    let data: CurrentVersion = serde_json::from_str(&response).into_diagnostic()?;
    let local_version = Version::parse(local_version_str).into_diagnostic()?;
    let remote_version = Version::parse(data.current_version.as_str()).into_diagnostic()?;

    fs::create_dir_all(check_state_path.parent().unwrap())?;

    let check_state = OpenOptions::new()
        .write(true)
        .create(true)
        .open(&check_state_path)
        .into_diagnostic()?;

    serde_json::to_writer(check_state, &CheckState { last_alert: now }).into_diagnostic()?;

    if remote_version > local_version {
        return Ok(Some(data));
    }

    Ok(None)
}
