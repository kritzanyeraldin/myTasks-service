export const adaptTask = task => {
	const { is_done, ...restTask } = task

	return {
		...restTask,
		is_done: Boolean(is_done)
	}
}
