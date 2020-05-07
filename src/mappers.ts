import { RawMessengerAttributes, MessengerAttributes } from 'types';

const mapRawMessengerAttributesToMessengerAttributes = (
  attributes: RawMessengerAttributes,
): MessengerAttributes => ({
  appId: attributes.app_id,
  customLauncherSelector: attributes.custom_launcher_selector,
  alignment: attributes.alignment,
  verticalPadding: attributes.vertical_padding,
  horizontalPadding: attributes.horizontal_padding,
  hideDefaultLauncher: attributes.hide_default_launcher,
  sessionDuration: attributes.session_duration,
  actionColor: attributes.action_color,
  backgroundColor: attributes.background_color,
});

export { mapRawMessengerAttributesToMessengerAttributes };
