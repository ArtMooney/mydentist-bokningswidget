# MyDentist - Bokningswidget

To change the registry URL for the Font Awesome package to use a public server and a free version, you need to update the @fortawesome:registry value in your npm configuration. Since you mentioned you don't have a password, you should revert the registry to the public npm registry. Here's how you can do it:

View the Current Configuration:
Before making any changes, let's first view the current npm configuration with:

npm config list

Look for the @fortawesome:registry line to confirm the current value.
Change the Font Awesome Registry:
To change the registry URL for the Font Awesome package to use the public npm registry, you can use the npm config set command:

npm config set @fortawesome:registry https://registry.npmjs.org/

This command sets the registry for the @fortawesome scope to the public npm registry.
Verify the Changes:
After running the npm config set command, verify that the @fortawesome:registry value has been updated by running:

npm config get @fortawesome:registry

It should now show https://registry.npmjs.org/.
This change will instruct npm to use the public npm registry for the Font Awesome package, which should allow you to access the free version without requiring an authentication token.
