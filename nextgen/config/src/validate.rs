use moon_common::color;
use schematic::ValidateError;
use semver::{Version, VersionReq};
use std::path::{Path, PathBuf};
use tracing::warn;

pub fn check_yml_extension(path: &Path) -> PathBuf {
    let mut yaml_path = path.to_path_buf();
    yaml_path.set_extension("yaml");

    if yaml_path.exists() {
        warn!(
            config = ?yaml_path,
            "Found a config file with the {} extension, please use {} instead. We'll continue to load the file, but this will cause unintended side-effects!",
            color::file(".yaml"),
            color::file(".yml"),
        );

        return yaml_path;
    }

    path.to_path_buf()
}

// Validate the value is a valid child relative file system path.
// Will fail on absolute paths ("/"), and parent relative paths ("../").
pub fn validate_child_relative_path(value: &str) -> Result<(), ValidateError> {
    let path = Path::new(value);

    if path.has_root() || path.is_absolute() {
        return Err(ValidateError::new("absolute paths are not supported"));
    }

    if path.starts_with("..") {
        return Err(ValidateError::new(
            "parent relative paths are not supported",
        ));
    }

    Ok(())
}

// Validate the value is a valid child relative file system path or root path.
// Will fail on parent relative paths ("../") and absolute paths.
#[allow(dead_code)]
pub fn validate_child_or_root_path<T: AsRef<str>>(value: T) -> Result<(), ValidateError> {
    let path = Path::new(value.as_ref());

    if (path.has_root() || path.is_absolute()) && !path.starts_with("/") {
        return Err(ValidateError::new(
            "absolute paths are not supported (workspace relative paths must start with \"/\")",
        ));
    }

    if path.starts_with("..") {
        return Err(ValidateError::new(
            "parent relative paths are not supported",
        ));
    }

    Ok(())
}

pub fn validate_semver<D, C>(value: &str, _data: &D, _ctx: &C) -> Result<(), ValidateError> {
    Version::parse(value)
        .map_err(|error| ValidateError::new(format!("not a valid semantic version: {}", error)))?;

    Ok(())
}

pub fn validate_semver_requirement<D, C>(
    value: &str,
    _data: &D,
    _ctx: &C,
) -> Result<(), ValidateError> {
    VersionReq::parse(value).map_err(|error| {
        ValidateError::new(format!(
            "doesn't meet semantic version requirements: {}",
            error
        ))
    })?;

    Ok(())
}
