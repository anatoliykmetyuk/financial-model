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
![Cashflow](/imgs/budget.png)
