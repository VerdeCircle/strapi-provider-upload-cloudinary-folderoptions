# strapi-provider-upload-cloudinary-folderoptions

This is an extended version of strapi-provider-upload-cloudinary

## Configurations

Your configuration is passed down to the cloudinary configuration. (e.g: `cloudinary.config(config)`). You can see the complete list of options [here](https://cloudinary.com/documentation/cloudinary_sdks#configuration_parameters)

See the [using a provider](https://strapi.io/documentation/v3.x/plugins/upload.html#using-a-provider) documentation for information on installing and using a provider. And see the [environment variables](https://strapi.io/documentation/v3.x/concepts/configurations.html#environment-variables) for setting and using environment variables in your configs.

**Example**
default_folder option has been added to the config to allow for uploading to a specific cloudinary folder by default.
The file name can also be used to specify a folder structure that remains under the default_folder option or overrides the default_folder options.

For example:
+ example_app.png could be uploaded to /[default_folder]/logos/apps cloudinary folder by having a default_folder option set and changing the file name to logos/apps/example_app.png

+ If you want to override the default_folder options at the time of upload, change the file name to /logos/apps/example_app.png. This would upload the file under a cloudinary folder structure of /logos/apps instead of /[default_folder]/logos/apps

While Cloudinary can handle all the image size/cropping/quality/etc for you so that you don't have to turn on the "Enable responsive friendly upload" on Strapi, this will also take into consideration the different default sizing Strapi performs and place them in subfolder accordingly (e.g. thumbnail, small, medium, large)


`./config/plugins.js`

```js
module.exports = ({ env }) => ({
  // ...
  upload: {
    provider: 'cloudinary-folderoptions',
    providerOptions: {
      cloud_name: env('CLOUDINARY_NAME'),
      api_key: env('CLOUDINARY_KEY'),
      api_secret: env('CLOUDINARY_SECRET'),
      default_folder: env('CLOUDINARY_DEFAULT_FOLDER'),
    },
  },
  // ...
});
```

## Resources

- [License](LICENSE)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
