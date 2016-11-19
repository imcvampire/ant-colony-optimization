/**
 * Pass the arguments for next promise task
 */
export function pass(...arg)
{
	return new Promise(resolve =>
	{
		resolve(...arg);
	});
}


/**
 * Delay promise in given duration
 * 
 * E.g.
 * ```
 * emit('ok').then(delay(duration)).then(console.log);
 * ```
 * 
 * @param {number} duration millisecond
 */
export function delay(duration)
{
	return (...arg) =>
	{
		return new Promise(resolve =>
		{
			setTimeout(() => {resolve(...arg)}, duration);
		});
	}
}