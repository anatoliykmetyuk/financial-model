# Budget Modelling Software
This is a Google Sheets based budgeting software.

## Quick Start
1. Head to the [Google Sheets template](https://docs.google.com/spreadsheets/d/1_75YNlc7KBPSW7d82w6NzdktaggdKgAb65zf3edk5-8/edit?usp=sharing)
2. Select "Make a Copy" from the "File" menu. This will create a copy of the template in your Google Drive.

## Purpose & Target Audience
The purpose of the app is to model the consequences of your financial decisions in real time. The questions answered are similar to the following:

- How much money will I have 3 months down the line if I go to an €1500 vacation in a week?
- Am I able to afford a €400/month dental treatment for a year?
- If I am not able to afford something, what are my options to make it happen?

This is a very opinionated piece of software – meaning its user must follow a particular way of reasoning about their financial life to get the most out of the software. Hence this software will most probably not be a good fit for the majority of people.

The assumptions about the user are as follows:

- Their main source of income is selling their time (i.e. employees or freelancers).
- They are disciplined enough to spend about an hour per week to maintain their financial lives in order.
- They do not already have their own opinionated method of maintaining order in their financial lives.

## Model
Financial life of a person is represented in this app with three models:

- Cashflow
- Monthly budget
- Subscriptions

### Cashflow
![Cashflow](/imgs/cashflow.png)

Inspired by the works of Robert Kiyosaki, this model answers the following questions:

- How much money goes in and out of the pocket each month?
- How much is left each month?

The usage of the spreadsheet is straightforward: simply enter all of your monthly expenses in the "Expenses" section. They will be automatically sorted, and the "Living" expense will be automatically highlighted via bold font.

"Living" represents a special expense. Basically these are your day-to-day expenses such as groceries. You don't know ahead of time the precise value for any given month but you can make a reasonable estimate.

Since all of the other expenses are constant and well-predictable, "Living" expense is special (as we will see in the Monthly Budget model section).

"Cashflow" section of the spreadsheet will calculate how much money you have left each month – your cashflow. These are your free money, the bottomline you'll have at the end of each month.

Since "Living" expenses are not constant from month to month, this bottomline is supposed to also be just an estimate. It makes sense to also compute the cashflow without the living expenses. This will give the constant bottomline that will stay exactly the same each month.

### Monthly Budget
![Monthly Budget](/imgs/budget.png)

If Cashflow represented recurring expenses, Monthly Budget represents one-time expenses.

Let us first look at the column organization of this model and then look at its entries.

#### Columns
__Name__ and __Date__ are straightforward: the name and the projected date of the planned expense.

__Cashflow__ is how much you spend or earn. Expenses are negative, incomes are positive.

__Cumulative__ is the most important column from the predictive point of view. It tells you how much money you will have at the corresponding Date. The way it does so is by subtracting all expenses and adding all the earnings to the starting cash for all the expenses prior to and on the corresponding Date. __It is automatically computed – never delete or modify this column!__

The name of the game is to never allow this value to drop below 0 (because this means you won't have the money on that day). The idea is to have 2-3 sheets for the budges of the next 2-3 months and constantly correct them to reflect your current idea of the future. Obviously you cannot accurately plan all of your expenses for the next 2-3 months – hence the idea of returning to the model regularly and constantly adjusting it according to your plans.

The scrips attached to the spreadsheet will automatically sort expenses by date and highlight the "current" expense (the one whos date is closes to today). This allows to play with the model really fast to see how your financial future changes in response to your decisions.

#### Entries
The Budget is composed well ahead of time (2-3 months ahead of time). Each month has its own Budget sheet containing all the income and expenses for that month.

The Budget starts with the __Start Cash__ entry, which represents the money you are starting with (most often the money left over from the previous month). Start Cash's date represents the start of your financial month. If you have a fixed salary date, it is a good idea to start each new month on that date.

Next, it is a good practice to put the __Cashflow__ entry the value of which is __Total No Living__ value from the "Cashflow" model. Basically, it is the money you have in your disposal for the upcoming month after all the constant expenses are paid.

Since living expenses are variable, it is a good idea to split them across the month, e.g. in four entries representing living expenses for each of the four weeks of the month. The idea is that each week you will get back to the budget, compare the real living expenses to the ones you predicted and correct them as necessary

Whenever you are planning to make an expense that doesn't fit into the "Living" section – e.g. you make a daytrip to another city and need to account for a train ticket, or you want to buy a new cell phone – you enter this expense in the model.

The important thing to keep in mind is that this is the _modelling tool_, not _tracking tool_. So ideally you need to enter the expenses _well before_ you make them, the purpose being to see how it impacts your financial life.

Next, there are the following three rows at the bottom:

- __Bottomline__ – how much money you will have left at the end of the month.
- __Cashflow__ – will you earn more than you spend this month? Very similar to the Bottomline but without this month's start cash.
- __Expenses__ – how much did you spend this month (not counting the constant expenses).

#### Private Accounts
These are places where you store the money. The most interesting part is the bottomline fields of this section.

Basically, the main utility of this section is to check whether your real state of finances corresponds to the one predicted by your budget. To check whether you are on track with your budget, calculate how much money you have in reality and subtract how much the model predicts you must have for a this day. Remember that the most important column of the budget, "Cumulative", predicts how much money you will have for its corresponding "Date".

- __Date__ is the day for which you perform the comparison. Double-click it to select a new date, or erase it completely to set it to today. Not necessarily should be today: e.g. you may want to compare your current money to the one predicted by the model for the end of this week – this way, you'll know how much money you have left for day-to-day expenses till the end of the week.
- __Total__ is the real amount of money you have.
- __Projected Total__ is the predicted money you will have on a given date. It is the "Cumulative" column for the date closest to the one you entered.
- __Delta__ is "Total" - "Projected Total". If it is positive it means you're doing better than the model projected and have some free money. If it is negative, you spent more than planned.

#### Workflow
You want to return to your monthly budgets every one-two weeks and correct them to reflect your reality. Every month should be on its separate sheet. To create a new month budget sheet, just duplicate the current one and populate it for the next month.

__When working with the entries, do not touch the "Cumulative" column!__. If you add an entry, only write its name, date and cashflow. When deleting an entry, only delete these three columns.

When returning to correct your budget sheets, the typical procedure is as follows:

1. Manually check all of your financial accounts and enter the balance for each in the "Private Accounts" section.
2. Go through the expenses since your previous correction of the budget sheets. Check if the values for these are correct and if any other expenses took place. Correct as necessary.
3. Set the "Date" to today (or the closest date in future). Verify that "Delta" is positive (meaning you have the "Delta" amount of free money till either today or the said date in future). If not, see why you spent more than intended and whether you can prevent it in future.
4. For all the expenses you planned for the future, enter them in the budget if they are not already there. Verify that these new expenses don't make the "Cashflow" drop below zero for your foreseeable future.

### Subscriptions
![Subscriptions](/imgs/subscrs.png)

