import type { CalculatePositionOptions, Placement } from './types';

let scrollingToTarget: number | undefined = undefined;

/**
 * Returns a string with CSS variables that can be used in conjunction with CSS to set the correct position for a show modal or highlightcontainer
 *
 * @param target The element that is targetted by this highlightcontainer or modal
 * @param options Parameters used for calculating the correct placement for either type
 * @returns string with css parameters that can be set as style
 */
export function calculatePosition(
	target: Element | string | null = null,
	options: CalculatePositionOptions
): string {
	// If the target is a query string use it to select a target
	if (typeof target === 'string') {
		target = document.querySelector(target);
	}

	// If the target is null (e.g. it does not exist), no positioning is needed
	if (!target) return '';

	if (options['type'] === 'Modal') {
		const { id, placement } = options;
		return calculateModalPosition(id, target, placement);
	} else {
		let { top, left, width, height } = target.getBoundingClientRect();
		const { oversizeX, oversizeY, scrollX, scrollY } = options;

		top = top + (scrollY || 0);
		left = left + (scrollX || 0);
		width = width + (oversizeX || 0);
		height = height + (oversizeY || 0);

		scrollingToTarget = scrollToTarget(target);

		return `--top: ${top}px; --left: ${left}px; --width: ${width}px; --height: ${height}px;`;
	}
}

/**
 * Determines the exact position fir a modal based on the placement and a target
 *
 * @param id ID of the modal of which the position is calculated
 * @param target Element which points to the target that is currently being hightlighted
 * @param placement Placement for the modal (top, left, bottom, right)
 * @returns string with css variables based on which a precise position can be set
 */
function calculateModalPosition(id: string, target: Element, placement?: Placement) {
	let xValue = '';
	let yValue = '';
	let xOffset = '';
	let yOffset = '';

	if (!placement) placement = 'bottom';

	const modal = document.getElementById(id);

	if (!modal) return '';

	const { top, bottom, left, right } = target.getBoundingClientRect();

	if (placement === 'bottom') {
		xValue = `${left + scrollX}px`;
		yValue = `${bottom + scrollY}px`;
		xOffset = '-0.25em';
		yOffset = '0.5rem';
	} else if (placement === 'left') {
		xValue = `${left + scrollX - modal.offsetWidth}px`;
		yValue = `${top + scrollY}px`;
		xOffset = '-1rem';
		yOffset = '-0.25em';
	} else if (placement === 'top') {
		xValue = `${left + scrollX}px`;
		yValue = `${top + scrollY - modal.offsetHeight}px`;
		xOffset = '-0.25em';
		yOffset = '-1rem';
	} else if (placement === 'right') {
		xValue = `calc(${right + scrollX}px + 0.5rem)`;
		yValue = `calc(${top + scrollY}px - 0.25em)`;
		xOffset = '0.5rem';
		yOffset = '-0.25em';
	}

	scrollingToTarget = scrollToTarget(target);

	return `--x: ${xValue}; --y: ${yValue}; --xOffset: ${xOffset}; --yOffset: ${yOffset};`;
}

/**
 * Sets a small timout before scrolling to a target to ensure all animations follow smoothly, clears previously set timeout
 * 
 * @param target Element to which we need to scroll
 * @returns the timeout before this element is scrolled towards
 */
function scrollToTarget(target: Element) {
	clearTimeout(scrollingToTarget);

	return setTimeout(() => {
		target.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
			inline: 'center'
		})
	}, 100);
}
