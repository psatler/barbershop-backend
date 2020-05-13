interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    // insert one of the emails found in the "Email Addresses" tab of AWS SES
    from: {
      email: 'pablo@fakedomain.com',
      name: 'Pablo from Brazil',
    },
  },
} as IMailConfig;
