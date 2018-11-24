import React from 'react';
import PropTypes from 'prop-types';
import { Slider as ASlider } from 'antd';

const Slider = ({ color, ...props }) => (
	<div className={color && 'custom'}>
		<style jsx>{`
			:global(.custom .ant-slider-track),
			:global(.custom .ant-slider:hover .ant-slider-track) {
				background-color: ${color};
			}
			:global(.custom .ant-slider-handle),
			:global(.custom .ant-slider:hover .ant-slider-handle) {
				border-color: ${color};
			}
			:global(.custom .ant-slider-handle:focus) {
				box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.15);
			}
			:global(.ant-slider) {
				padding: 0;
				padding-top: 5px;
				margin: 0;
			}
			:global(.ant-slider-rail) {
				background-color: rgba(0, 0, 0, 0.12);
			}
		`}</style>
		<ASlider {...props} />
	</div>
);

Slider.propTypes = {
	color: PropTypes.string,
};

Slider.defaultProps = {
	color: undefined,
};

export default Slider;
