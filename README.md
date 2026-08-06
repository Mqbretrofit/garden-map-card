# Garden Map Card

Home Assistant custom dashboard card combining Anthbot mower mapping and irrigation controls.

## Current version

v158

## Installation

Copy these frontend files from the repository root to:

`/config/www/garden-map-card/`

The required files include `garden-map-card.js`, `irrigation-map-card.js`, the renderer, styles, translations and images.

Copy the scheduler package separately:

`packages/irrigation_scheduler.yaml` → `/config/packages/irrigation_scheduler.yaml`

Your `configuration.yaml` must load the packages directory:

```yaml
homeassistant:
  packages: !include_dir_named packages
```

Then add this Lovelace resource as a JavaScript module:

`/local/garden-map-card/garden-map-card.js?v=158`

See `TELEPITES.txt` and `garden-map-card.yaml` for the complete Hungarian installation and configuration example.
