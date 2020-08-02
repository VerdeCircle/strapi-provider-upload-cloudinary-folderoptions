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

**Starting Cloudinary**
![Starting Cloudinary](https://res.cloudinary.com/dtyevsyrr/image/upload/f_auto,q_auto/v1596346107/strapi-provider-upload-cloudinary-folderoptions/cloudinary-starting_zepcmj.png)

**Upload files to root by adding /logos/apps/ to the file name**
![Upload Asset in Strapi with desired folder strcuture](https://res.cloudinary.com/dtyevsyrr/image/upload/f_auto,q_auto/v1596346106/strapi-provider-upload-cloudinary-folderoptions/strapi-upload-root_gmpjk6.png)

And the result is...
**New Folder in Cloudinary root**
![New Folder in Cloudinary root](https://res.cloudinary.com/dtyevsyrr/image/upload/f_auto,q_auto/v1596346107/strapi-provider-upload-cloudinary-folderoptions/cloudinary-strapi-upload-root_xtahw3.png)

**Files in directory structure specified**
![Files in directory structure specified](https://res.cloudinary.com/dtyevsyrr/image/upload/f_auto,q_auto/v1596346106/strapi-provider-upload-cloudinary-folderoptions/cloudinary-strapi-upload-root-elements_smpipr.png)
^^^ In this case, we have "Enable responsive friendly upload" set to on in Strapi>Settings>Media Library

![Strapi Media Library Settings](https://res.cloudinary.com/dtyevsyrr/image/upload/f_auto,q_auto/v1596346752/strapi-provider-upload-cloudinary-folderoptions/strapi-settings-medialibrary_si9lok.png)

**Upload files using the default_folder option AND even adding your own folder structure**
![Strapi Asset Upload default_folder & additional folder structure](https://res.cloudinary.com/dtyevsyrr/image/upload/f_auto,q_auto/v1596346107/strapi-provider-upload-cloudinary-folderoptions/strapi-upload-default_folder_q23inl.png)

And the result is...
**default_folder (which is set in .env file) created on cloudinary root with file specific sub folders as well**
![default_folder option](https://res.cloudinary.com/dtyevsyrr/image/upload/f_auto,q_auto/v1596346106/strapi-provider-upload-cloudinary-folderoptions/cloudinary-strapi-upload-default_folder-elements_rk5uoc.png)



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
