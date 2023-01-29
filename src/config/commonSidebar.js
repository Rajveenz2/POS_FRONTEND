const commonMenu = [
  {
    title: 'Organizations', name: 'OrganizationIndex', icon: 'business_center',
  },
  {
    title: 'Users', name: 'UserIndex', icon: 'group',
  },
  {
    title: 'eSMS SMS Log', name: 'ESMSSMSLog', icon: 'mdi-android-messages',
  },
  {
    title: 'Nexmo SMS Log', name: 'NexmoSMSLog', icon: 'mdi-message-bulleted',
  },
  {
    title: 'SES E-mail Log', name: 'SESEmailLog', icon: 'mdi-email-multiple',
  },  
  {
    title: 'Update SG Response', name: 'UpdateSGResponse', icon: 'mdi-account-convert-outline',
  },  
];

// reorder menu
commonMenu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default commonMenu;
