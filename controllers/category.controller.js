import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import categoryService from "../services/category.service.js";
import serviceService from "../services/service.service.js";

const getCategories = catchAsync(
    async (req, res) => {
        if (req.query.type === 'id') {
            const category = await categoryService.getById(req.query.id);
            if (!category) {
                throw new ApiError(httpStatus.NOT_FOUND, 'INVALID_CATEGORY');
            }
            res.send(category);
    
        } else if(req.query.type === 'slug') {
            if (req.query.slug === 'buy-instagram-story-views') {
                const category = await categoryService.storyViews();
                if (!category) {
                    throw new ApiError(httpStatus.NOT_FOUND, 'INVALID_CATEGORY');
                }
                res.send(category);
            } else {
                const category = await categoryService.getBySlug(req.query.slug);
                if (!category) {
                    throw new ApiError(httpStatus.NOT_FOUND, 'INVALID_CATEGORY');
                }
                res.send(category);
            }
        } else {
            const results = await categoryService.list({});
            res.status(httpStatus.CREATED).send(results);
        }
    }
)

const getCategory = catchAsync(
    async (req, res) => {
        console.log("Req =>", req.params)
        const category = await categoryService.getBySlug(req.params.slug);
        if (!category) {
            throw new ApiError(httpStatus.NOT_FOUND, 'INVALID_CATEGORY');
        }
        res.send(category);

    }
)

const getCategoryServices = catchAsync(
    async (req, res) => {
        const category = await categoryService.getById(req.params.id)
        if (category.urlSlug === 'instagram-growth') {
            const items = await serviceService.growPacks({})
            if (!items) {
                throw new ApiError(httpStatus.NOT_FOUND, 'NO_GROW_PACKS');
            }
            res.send(items);
        } else if (category.urlSlug === 'buy-auto-instagram-likes') {
            const items = await serviceService.autoPacks({})
            if (!items) {
                throw new ApiError(httpStatus.NOT_FOUND, 'NO_AUTO_PACKS');
            }
            res.send(items);
        } 
        // else if (category.urlSlug === 'buy-instagram-story-views') {
        //     const items = await serviceService.storyViews({})
        //     if (!items) {
        //         throw new ApiError(httpStatus.NOT_FOUND, 'NO_STORY_VIEWS_FOUND');
        //     }
        //     res.send(items);
        // } 
        else {
            const items = await serviceService.list({categoryId: {$eq: req.params.id}});
            if (!items) {
                throw new ApiError(httpStatus.NOT_FOUND, 'NO_PRODUCT_ITEMS');
            }
            res.send(items);
        }
    }
)

const getCategoryServicesBySlug = catchAsync(
    async (req, res) => {
        console.log('Slug =>', req.params.slug)
        const category = await categoryService.getBySlug(req.params.slug);
        if (!category) {
            throw new ApiError(httpStatus.NOT_FOUND, 'NOT_FOUND_CATEGORY');
        }
        const items = await serviceService.list({categoryId: {$eq: category._id}});
        if (!items) {
            throw new ApiError(httpStatus.NOT_FOUND, 'NO_PRODUCT_ITEMS');
        }
        res.send(items);

    }
)

const categoryController = {
    getCategories, getCategory, getCategoryServices, getCategoryServicesBySlug
}

export default categoryController;