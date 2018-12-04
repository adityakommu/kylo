import { Component } from '@angular/core';
import * as _ from "underscore";
import {CategoriesService} from '../services/CategoriesService';
import {AccessControlService} from '../../services/AccessControlService';
import {AddButtonService} from '../../services/AddButtonService';
import {StateService} from '../../services/StateService';
import { TdDataTableService } from '@covalent/core/data-table';

@Component({
    selector: 'categories-controller',
    templateUrl: './categories.html',
    styles: [`
        mat-card {
            padding: 8px !important;
        }
        .feed-categories mat-card {
            border: 2px solid #EEEEEE;
            box-shadow: none;
        }
        .feed-categories mat-card mat-card-title {
            padding: 8px;
            max-height: 60px;
        }
        mat-card mat-card-title {
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-box-flex: 1;
            -webkit-flex: 1 1 auto;
            flex: 1 1 auto;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
            -webkit-flex-direction: row;
            flex-direction: row;
        }
    `]
})
export class CategoriesComponent{

    /**
    * List of categories.
    * @type {Array.<Object>}
    */
    categories: any = [];
    filteredCategories: any = [];
    /**
    * Indicates that the category data is being loaded.
    * @type {boolean}
    */
    loading: boolean = true;
    /**
    * Query for filtering categories.
    * @type {string}
    */
    searchQuery: string = "";
    getIconColorStyle: any;
    getColorStyle: any;

    ngOnInit(): void {
        this.getIconColorStyle = (color: any) => {
            let fillColor = (!color || color == '' ? '#90CAF9' : color);
            return { 'fill': fillColor };
        };

        this.getColorStyle = (color: any) => {
            let fillColor = (!color || color == '' ? '#90CAF9' : color);
            return { 'background-color': fillColor };
        };

        // Register Add button
        this.accessControlService.getUserAllowedActions()
            .then((actionSet: any) =>{
                if (this.accessControlService.hasAction(AccessControlService.CATEGORIES_EDIT, actionSet.actions)) {
                    this.addButtonService.registerAddButton('categories', ()=> {
                        this.stateService.FeedManager().Category().navigateToCategoryDetails(null);
                    });
                }
            });

        // Refresh list of categories
        this.categoriesService.reload().subscribe(categories => {
            this.loading = false;
            this.categories = categories;
            this.filter();
        });
    }

    /**
     * Displays a list of categories.
     *
     * @constructor
     * @param {AccessControlService} AccessControlService the access control service
     * @param AddButtonService the Add button service
     * @param CategoriesService the categories service
     * @param StateService the page state service
     */
    constructor(private accessControlService: AccessControlService, 
                private addButtonService: AddButtonService, 
                private stateService: StateService,
                private dataTable: TdDataTableService,
                private categoriesService: CategoriesService) {}
    /**
    * Navigates to the details page for the specified category.
    *
    * @param {Object} category the category
    */
    editCategory(category: any) {
        this.stateService.FeedManager().Category().navigateToCategoryDetails(category.id);
    };

    search(term: string) {
        this.searchQuery = term;
        this.filter();
    }

    filter() {
        if (!this.categories)
            return;
            
        let filteredCategoryTypes = this.dataTable.filterData(this.categories, this.searchQuery, true);
        filteredCategoryTypes = this.dataTable.sortData(filteredCategoryTypes, "name");
        this.filteredCategories = filteredCategoryTypes;
    }

}

