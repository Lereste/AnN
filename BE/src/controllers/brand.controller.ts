import FactoryService from '../services/factory.service';
import BrandModel from '../models/brand.model';

class BrandController {
    private factoryService = new FactoryService();
    private createMessage: string = "Created Brand Successfully!"
    private getOneMessage: string = "Fetched Brand Successfully!"
    private updatedMessage: string = "Updated Brand Successfully!"
    private deleteddMessage: string = "Deleted Brand Successfully!"

    public createNewBrand = this.factoryService.createOne(BrandModel, this.createMessage);
    public getBrandById = this.factoryService.getOne(BrandModel, { path: 'products' });
    public getAllBrands = this.factoryService.getAll(BrandModel);
    public updateBrandById = this.factoryService.updateOne(BrandModel, this.updatedMessage);
    public deleteBrandById = this.factoryService.deleteOne(BrandModel, this.deleteddMessage);
}

export default BrandController; 