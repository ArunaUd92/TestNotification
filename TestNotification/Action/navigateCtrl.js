import { StackActions, NavigationActions } from 'react-navigation';

export const resetStack = (screen_name) => StackActions.reset({ 
  index : 0,
   actions: [NavigationActions.navigate({ routeName: screen_name })],
});

export const resetStackWithPassingData = (screen_name, push_data) => StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: screen_name, params: {PUSH_NOTIFI_DATA: push_data} })],
});
 