import joi from 'joi';

const priceRangeSchema = {
	status: joi.string().required(),
	min_price: joi.number().required(),
	max_price: joi.number().required(),
	start_year: joi.number().required(),
	stop_year: joi.number().required(),
	state: joi.string().required(),
	manufacturer: joi.string().required(),
	model: joi.string().required(),
};

export default priceRangeSchema;
