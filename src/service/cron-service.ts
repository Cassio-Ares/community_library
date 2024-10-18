import cron from 'node-cron'
import moment from 'moment'
import loansServices from './loans.services'
import sendReminderEmail from './email.services'

cron.schedule('0 9 * * *', async () => {
    console.log('Running daily job to check for due dates...');
    const loans = await loansServices.findAllLoansService();
    const today = moment().startOf('day');
  
    loans.forEach((loan) => {
      const dueDate = moment(loan.dueDate).startOf('day');
      const reminderDueDate = moment(dueDate).subtract(1, 'days');
      if (today.isSame(reminderDueDate)) {
            sendReminderEmail(loan.usersEmail, loan.bookTitle, loan.dueDate);
        }
    })
})

/**
 * install:
 * 
 * npm install node-cron
 * npm i --save-dev @types/node-cron
 * 
 * npm install moment
 */