'use strict';

/**
 * Module dependencies
 */

// Public node modules.
const cloudinary = require('cloudinary').v2;
const intoStream = require('into-stream');

module.exports = {
  init(config) {
    cloudinary.config(config);

    return {
      upload(file, customConfig = {}) {
        const { filename, folder = config.default_folder || '' } = (() => {
          let objectpath = file.name.split('/').filter(folder => folder !== ''); // ignore multiple ///s
          const filename = objectpath.pop(); // filename is last element of the array
          let default_folder = (file.name[0] === '/') ? '' : config.default_folder || '';

          if (objectpath.length === 0) { // This means we should upload to the config.default_folder (if available) or the cloudinary root
          } else { // Handle the scenario where Strapi has Media Library::Enable responsive friendly upload on
            let resizevalue, resizeregex;
            let whatregex = [...objectpath[0].match(/^(?<t>thumbnail_).*|^(?<s>small_).*|^(?<m>medium_).*|^(?<l>large_).*/) || []];

            if (whatregex.length !== 0) { // This means we're dealing with a resize
              if (objectpath.length === 1) default_folder = ''; // <<< This means requested folder is the root folder

              resizevalue = whatregex.shift(); // Remove the first element which should tell us the folder we're going to bump to the end
              resizeregex = whatregex.find(item => item);

              if (resizevalue === resizeregex) { // root folder placement
                objectpath.shift();
                default_folder = '';
              } else {
                objectpath[0] = objectpath[0].replace(resizeregex, '');
              }
              objectpath.push(resizeregex.replace('_', ''));
            } else {
            }
          }
          console.log('Second: ', objectpath, filename);

          return {
            filename,
            folder: Array.prototype.concat(default_folder, objectpath).join('/')
          };
        })();

        return new Promise((resolve, reject) => {
          const upload_stream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto', public_id: file.hash, folder, ...customConfig },
            (err, image) => {
              if (err) {
                strapi.log.error(`Error uploading to cloudinary: ${err.message}`);
                return reject(new Error('Upload to cloudinary failed'));
              }

              if (image.resource_type === 'video') {
                file.previewUrl = cloudinary.url(`${image.public_id}.gif`, {
                  video_sampling: 6,
                  delay: 200,
                  width: 250,
                  crop: 'scale',
                  resource_type: 'video',
                });
              }

              file.url = image.secure_url;
              file.provider_metadata = {
                public_id: image.public_id,
                resource_type: image.resource_type,
              };
              resolve();
            }
          );

          intoStream(file.buffer).pipe(upload_stream);
        });
      },
      async delete(file, customConfig = {}) {
        try {
          const { resource_type, public_id } = file.provider_metadata;
          const response = await cloudinary.uploader.destroy(public_id, {
            invalidate: true,
            resource_type: resource_type || 'image',
            ...customConfig,
          });

          if (response.result !== 'ok') {
            throw {
              error: new Error(response.result),
            };
          }
        } catch (error) {
          throw new Error(error.error);
        }
      },
    };
  },
};
