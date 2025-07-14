---
id: custom-menus
title: Custom Menus
sidebar_position: 5
description: "How to create and use custom iPXE menus using the web interface"
hide_table_of_contents: false
---

# Custom Menus

The netboot.xyz web interface allows you to create custom iPXE menus that can be integrated into your netboot.xyz environment. This feature enables you to add your own boot options, utilities, or custom configurations without modifying the core netboot.xyz code.

## Prerequisites

- Access to the netboot.xyz web interface
- Basic understanding of iPXE scripting
- Ability to modify configuration files

## Creating a Custom Menu

### Step 1: Enable Custom Menu in Configuration

First, you need to modify the `boot.cfg` file to enable custom menu support:

```bash
set menu custom-user
```

This setting tells netboot.xyz to include the custom menu option in the main menu.

### Step 2: Create the Custom Menu File

1. Navigate to the netboot.xyz web interface
2. Click on the **Menus** option in the header
3. Create a new file with the filename `custom.ipxe`

### Step 3: Update the Menu Configuration

You need to update the `menu.ipxe` file to properly chain to your custom menu:

Replace the existing line:
```bash
chain custom/custom.ipxe
```

With:
```bash
chain custom/custom.ipxe
```

### Step 4: Configure Your Custom Menu

Inside the `custom.ipxe` file you created, add your custom menu configuration. You can structure your menu using standard iPXE syntax.

## Menu Structure Example

Here's a basic structure for your custom menu:

```bash
#!ipxe
######## CUSTOM MENU ########

:custom_menu
menu Custom Boot Options
item --gap -- Custom Options:
item custom_option1 Custom Option 1
item custom_option2 Custom Option 2
item --gap -- Tools:
item custom_tool1 Custom Tool 1
item --gap -- Return:
item return Return to Main Menu
choose --default return --timeout 10000 custom_target && goto ${custom_target}

:custom_option1
# Add your custom boot logic here
echo Booting Custom Option 1...
# Add your boot commands
goto custom_menu

:custom_option2
# Add your custom boot logic here
echo Booting Custom Option 2...
# Add your boot commands
goto custom_menu

:custom_tool1
# Add your custom tool logic here
echo Loading Custom Tool 1...
# Add your tool commands
goto custom_menu

:return
exit
```

## Resources and Examples

### Example Configuration

For a complete example of a custom menu configuration, visit:
- [netboot.xyz-custom example](https://github.com/netbootxyz/netboot.xyz-custom/blob/master/custom.ipxe.example)

### iPXE Documentation

For detailed information about iPXE commands and syntax:
- [iPXE Commands Reference](https://ipxe.org/cmd)

### Community Examples

You can find additional examples and inspiration from other users' configurations:
- [netboot.xyz-custom repository forks](https://github.com/netbootxyz/netboot.xyz-custom/forks)

## Best Practices

1. **Test your menu thoroughly** - Always test your custom menu in a safe environment before deploying to production
2. **Keep it simple** - Start with basic menu items and gradually add complexity
3. **Document your changes** - Comment your iPXE code to make it easier to maintain
4. **Use descriptive names** - Choose clear, descriptive names for your menu items
5. **Handle errors gracefully** - Include error handling in your custom boot logic

## Troubleshooting

### Common Issues

- **Menu not appearing**: Ensure `set menu custom-user` is properly set in `boot.cfg`
- **File not found**: Verify that `custom.ipxe` exists in the correct location
- **Syntax errors**: Check your iPXE syntax using the command reference
- **Boot failures**: Test individual boot commands before integrating them into the menu

### Getting Help

If you encounter issues with your custom menu:
1. Check the [iPXE documentation](https://ipxe.org/cmd) for command syntax
2. Review the [example configuration](https://github.com/netbootxyz/netboot.xyz-custom/blob/master/custom.ipxe.example)
3. Ask for help in the netboot.xyz community forums or GitHub discussions

## Related Documentation

- [Self Hosting](./selfhosting.md) - For information about self-hosted custom options
- [FAQ](./faq.md) - For general questions about netboot.xyz
- [Quick Start](./quick-start.md) - For getting started with netboot.xyz