import { ESummaryActions } from './types';

export const EmitedEventName = {
	SELECTED_ACTIONS_TO_TEMPORARY_SUMMARY: 'action-selected',
	REMOVE_ACTIONSSUMMARY: 'action-remove-summary'
};

export const actions = [
	{
		context: ['temporarysummary'],
		label: 'Add',
		type: ESummaryActions.add,
		class:
			'px-3 py-2 text-green-700 font-medium text-xs hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800'
	},
	{
		context: ['summary', 'temporarysummary'],
		label: 'Remove',
		type: ESummaryActions.remove,
		class:
			'px-3 py-2 text-xs font-medium text-center text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 rounded-lg'
	}
];
