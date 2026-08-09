# Garden Map Card

Home Assistant custom dashboard card combining Anthbot mower mapping and irrigation controls.

![Garden Map Card](garden.png)

## Current version

v161.2

## HACS installation

1. In HACS, open **Custom repositories**.
2. Add `https://github.com/Mqbretrofit/garden-map-card`.
3. Select the **Dashboard** category.
4. Download **Garden Map Card**.
5. Add this Lovelace resource as a JavaScript module if HACS does not add it automatically:

   `/hacsfiles/garden-map-card/garden-map-card.js`

The frontend card and all required JavaScript, image, style and translation files are installed by HACS.

### Irrigation scheduler package

HACS Dashboard repositories cannot install Home Assistant packages outside the frontend directory. Copy this file separately:

`packages/irrigation_scheduler.yaml` → `/config/packages/irrigation_scheduler.yaml`

Your `configuration.yaml` must load the packages directory:

```yaml
homeassistant:
  packages: !include_dir_named packages
```

Restart Home Assistant after installing or updating the scheduler package.

## Manual installation

Copy the frontend files from `dist/` to:

`/config/www/garden-map-card/`

Then add this Lovelace resource as a JavaScript module:

`/local/garden-map-card/garden-map-card.js?v=161.2`

See `TELEPITES.txt` and `garden-map-card.yaml` for the complete Hungarian installation and configuration example.

## License

MIT
