(function() {
  'use strict';

  if (!window.cordova) {
    window.facebookConnectPlugin = {
      getLoginStatus: function(s, f) {
        // Try will catch errors when SDK has not been init
        try {
          window.FB.getLoginStatus(function(response) {
            s(response);
          });
        }
        catch (error) {
          if (!f) {
            console.error(error.message);
          }
          else {
            f(error.message);
          }
        }
      },

      showDialog: function(options, s, f) {
        if (!options.name) {
          options.name = '';
        }
        if (!options.message) {
          options.message = '';
        }
        if (!options.caption) {
          options.caption = '';
        }
        if (!options.description) {
          options.description = '';
        }
        if (!options.href) {
          options.href = '';
        }
        if (!options.picture) {
          options.picture = '';
        }

        // Try will catch errors when SDK has not been init
        try {
          window.FB.ui(options, function(response) {
            if (response && (response.request || !response.error_code)) {
              s(response);
            }
            else {
              f(response);
            }
          });
        }
        catch (error) {
          if (!f) {
            console.error(error.message);
          }
          else {
            f(error.message);
          }
        }
      },

      // Attach this to a UI element, this requires user interaction.
      login: function(permissions, s, f) {
        // JS SDK takes an object here but the native SDKs use array.
        var permissionObj = {};
        if (permissions && permissions.length > 0) {
          permissionObj.scope = permissions.toString();
        }

        window.FB.login(function(response) {
          if (response.authResponse) {
            s(response);
          }
          else {
            f(response.status);
          }
        }, permissionObj);
      },

      getAccessToken: function(s, f) {
        var response = window.FB.getAccessToken();
        if (!response) {
          if (!f) {
            console.error('NO_TOKEN');
          }
          else {
            f('NO_TOKEN');
          }
        }
        else {
          s(response);
        }
      },

      logEvent: function(eventName, params, valueToSum, s, f) {
        // AppEvents are not avaliable in JS.
        s();
      },

      logPurchase: function(value, currency, s, f) {
        // AppEvents are not avaliable in JS.
        s();
      },

      logout: function(s, f) {
          // Try will catch errors when SDK has not been init
          try {
            window.FB.logout(function(response) {
              s(response);
            });
          }
          catch (error) {
            if (!f) {
              console.error(error.message);
            }
            else {
              f(error.message);
            }
          }
      },

      api: function(graphPath, permissions, s, f) {
        // JS API does not take additional permissions

        // Try will catch errors when SDK has not been init
        try {
          window.FB.api(graphPath, function(response) {
            if (response.error) {
              f(response);
            }
            else {
              s(response);
            }
          });
        }
        catch (error) {
          if (!f) {
            console.error(error.message);
          }
          else {
            f(error.message);
          }
        }
      },

      // Browser wrapper API ONLY
      browserInit: function(appId, version) {
        if (!version) {
          version = 'v2.0';
        }
        window.FB.init({
          appId: appId,
          cookie: true,
          xfbml: true,
          version: version
        });
      }
    };
  }
})();