import { LightningElement , track } from 'lwc';
import fetchObjectList  from '@salesforce/apex/DynamicPaginationClass.fetchObjectList';
import fetchFieldsList  from '@salesforce/apex/DynamicPaginationClass.fetchFieldsList';
import fetchRecords  from '@salesforce/apex/DynamicPaginationClass.fetchRecords';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class DynamicPagination extends LightningElement {
   @track showSpinner;
   @track objectList;
   @track fieldsList;
   @track vaues;
   @track records;
   columns;


   selectedObject;
   pageNumber = 1;    
   recordSize = '10';
   totalPages;
  

  constructor(){
     super();
     this.showSpinner = true;
     fetchObjectList()
     .then(result => {
        this.objectList = result;
        this.showSpinner = false;
     })
     .catch(error => {
        console.log('error while getting the object list ::: ', error);
        this.showSpinner = false;
     })
  }

    get disablePreviousButtons(){
        if(this.selectedFields == undefined || this.selectedFields.length == 0 || this.pageNumber == 1) return true;
    } 

    get disableNextButtons(){
        if(this.selectedFields == undefined ||  this.selectedFields.length == 0 || this.pageNumber == this.totalPages) return true;
    }

    get getRecordSizeList(){
        let recordSizeList = [];
        recordSizeList.push({'label': '10', 'value': '10'});
        recordSizeList.push({'label': '25', 'value': '25'});
        recordSizeList.push({'label': '50', 'value': '50'});
        recordSizeList.push({'label': '100', 'value': '100'});
        return recordSizeList;

    }

    get disableCombobox(){
         !this.records || this.records.length == 0 ? true : false; 
    }

    get recordViewMessage(){
        return 'Total Records -' + this.totalRecords + ' Current page - ' + this.pageNumber + '/' + this.totalPages;  
    }


    handleObjectSelection(event){
        this.fieldsList = [];
        this.values = [];
        this.showSpinner = true;
        this.selectedObject = event?.detail?.value;

       fetchFieldsList({
          objName : event?.detail?.value
       })
       .then(result => {
           this.fieldsList = result;
           this.showSpinner = false;
         
       })
       .catch(error => {
           this.showSpinner = false;
           console.log('error while getting the fields list ::: ',error);
       })
    }

   onclickHandler() {
    this.showSpinner = true;

    fetchRecords({
        objName : this.selectedObject,
        fieldsList : this.selectedFields,
        pageNumber : this.pageNumber,
        recordCount : Number(this.recordSize)
    })
    .then(result => {

        if(result != null && result != undefined) {
            this.records = result.records;
            this.totalRecords = result.totalRecords;
            this.totalPages = Math.ceil(result.totalRecords / Number(this.recordSize));

            var fieldsColumn = [];
            for(var i = 0; i < this.fieldsList.length; i++) {
                for(var j = 0; j < this.selectedFields.length; j++) {
                    if(this.fieldsList[i].value == this.selectedFields[j]) {
                        fieldsColumn.push(this.fieldsList[i]);
                    }
                }
            }

            var columnList = [];
            for(var j = 0; j < fieldsColumn.length; j++) {
                columnList.push({'label': fieldsColumn[j].label, 'fieldName': 
                fieldsColumn[j].value, 'type': fieldsColumn[j].datatype});
            }
            this.columns = columnList;
        }
        const accordion = this.template.querySelector('.pagination-accordion');
        accordion.activeSectionName = 'B';
        this.showSpinner = false;
    }).catch(error => {
        console.log(error);
        if(error && error.body && error.body.message) {
            this.showNotification(error.body.message, 'error');
        }
        this.showSpinner = false;
    })
  }

  handleFieldsChange(event){
      this.selectedFields = event.detail.value;
  }



  handleRecordSizeChange(event){

    this.recordSize = event.detail.value;
    this.pageNumber = 1;
    this.onclickHandler();
    }

 navigationHandler(event){
        
    let buttonName = event.target.label;

        if(buttonName == 'First'){
            this.pageNumber = 1;
        }
        else if(buttonName == 'Next'){
            this.pageNumber = this.pageNumber >= this.totalPages ? this.totalPages : this.pageNumber + 1;
        }
        else if(buttonName == 'Previous'){
           this.pageNumber =  this.pageNumber > 1 ? this.pageNumber - 1 : 1 ;

        } 
        else if(buttonName == 'Last'){
            this.pageNumber = this.totalPages;
        }
        this.onclickHandler();
    }


showNotification(message , variant){
    const evt = new ShowToastEvent({
          'message' : message,
          'variant' : variant
    });
    this.dispatchEvent(evt);
}


}