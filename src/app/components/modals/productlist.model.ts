// Product Tag
export type ProductTags = 'nike' | 'puma' | 'lifestyle' | 'caprese';

// Product Colors
export type ProductColor = 'white' | 'black' | 'red' | 'green' | 'purple' | 'yellow' | 'blue' | 'gray' | 'orange' | 'pink';


export class Productlist {
    id?: number;
    mainCategory?: number;
    category?: number;
    subCategory?: number;
    productName?: string;
    brandName?: string;
    manufacturerName?: string;
    productCode?: number;
    startRating?: boolean;
    productSRNumber?: string;
    productPrice?: number;
    discountPrice?: number;
    emiOptiions?: boolean;
    avibilityStatus?: boolean;
    descripition?: string;
    relatedProduct?: boolean;
    productSize?: string;
    itemWeight?: string;
    isActive?: number;
    productMainImage?: string;
    selectedSize?: any[];
    userid?: any;
    productid?: number;
    quantity?: number;
    updateddate?: Date;
    total?: number;
    isNewArrival?: boolean;
    isBestProduct?: boolean;
    isHot?: boolean;
    isOnSale?: boolean;
    tags?: ProductTags[];
    colors?: ProductColor[];

    stock?: any;
    constructor(
        id?: number,
        mainCategory?: number,
        category?: number,
        subCategory?: number,
        productName?: string,
        brandName?: string,
        manufacturerName?: string,
        productCode?: number,
        startRating?: boolean,
        productSRNumber?: string,
        productPrice?: number,
        discountPrice?: number,
        emiOptiions?: boolean,
        avibilityStatus?: boolean,
        descripition?: string,
        relatedProduct?: boolean,
        productSize?: string,
        itemWeight?: string,
        isActive?: number,
        productMainImage?: string,
        selectedSize?: any[],
        userid?: any,
        productid?: number,
        quantity?: number,
        updateddate?: Date,
        total?: number,
        isNewArrival?: boolean,
        isBestProduct?: boolean,
        isHot?: boolean,
        isOnSale?: boolean,
        tags?: ProductTags[],
        colors?: ProductColor[],

        stock?: any,

    ) {
        this.id = id;
        this.mainCategory = mainCategory;
        this.category = category;
        this.subCategory = subCategory;
        this.productName = productName;
        this.brandName = brandName;
        this.manufacturerName = manufacturerName;
        this.productCode = productCode;
        this.startRating = startRating;
        this.productSRNumber = productSRNumber;
        this.productPrice = productPrice;
        this.discountPrice = discountPrice;
        this.emiOptiions = emiOptiions;
        this.avibilityStatus = avibilityStatus;
        this.descripition = descripition;
        this.relatedProduct = relatedProduct;
        this.productSize = productSize;
        this.itemWeight = itemWeight;
        this.isActive = isActive;
        this.productMainImage = productMainImage;
        this.selectedSize = selectedSize;
        this.userid = userid;
        this.productid = productid;
        this.quantity = quantity;
        this.updateddate = updateddate;
        this.total = total;
        this.isNewArrival = isNewArrival;
        this.isBestProduct = isBestProduct;
        this.isHot = isHot;
        this.isOnSale = isOnSale;
        this.tags = tags;
        this.colors = colors;

        this.stock = stock;
    }
}
 // Color Filter
 export interface ColorFilter {
    color?: ProductColor;
  }
