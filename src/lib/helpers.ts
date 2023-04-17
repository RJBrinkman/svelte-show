import type { CalculatePositionOptions, Placement } from './types';

export function calculatePosition(
	target: Element | string | null = null,
	options: CalculatePositionOptions
) {
	if (typeof target === 'string') {
		target = document.querySelector(target);
	}

	if (!target) return '';

	if (options['type'] === 'Modal') {
		const { id, placement } = options;
		return calculateModalPosition(id, target, placement);
	} else {
		const { top, left, width, height } = target.getBoundingClientRect();
		const { oversizeX, oversizeY, scrollX, scrollY } = options;
		return `--top: ${top + (scrollY || 0)}px; --left: ${left + (scrollX || 0)}px; --width: ${
			width + (oversizeX || 0)
		}px; --height: ${height + (oversizeY || 0)}px;`;
	}
}

function calculateModalPosition(id: string, target: Element, placement?: placement) {
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

	return `--x: ${xValue}; --y: ${yValue}; --xOffset: ${xOffset}; --yOffset: ${yOffset};`;
}
