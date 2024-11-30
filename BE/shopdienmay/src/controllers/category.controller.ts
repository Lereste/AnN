import FactoryService from '../services/factory.service';
import CategoryModel from '../models/category.model';

class CategoryController {
    private factoryService = new FactoryService();
    private createMessage: string = "Created Category Successfully!"
    private getOneMessage: string = "Created Category Successfully!"
    private updatedMessage: string = "Updated Category Successfully!"
    private deleteddMessage: string = "Deleted Category Successfully!"

    // public createUser = async (req: Request, res: Response, next: NextFunction) => {
    // }

    public createNewCategory = this.factoryService.createOne(CategoryModel, this.createMessage);
    public getCategoryById = this.factoryService.getOne(CategoryModel, { path: 'products' })
    public getAllCategories = this.factoryService.getAll(CategoryModel)
    public updateCategoryById = this.factoryService.updateOne(CategoryModel, this.updatedMessage);
    public delelteCategoryById = this.factoryService.deleteOne(CategoryModel, this.deleteddMessage);
}

export default CategoryController;