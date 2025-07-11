public class DynamicPaginationClass {
	
	@AuraEnabled 
	public static list<PicklistOptions> fetchObjectList(){

		list<PicklistOptions> objectList = new list<PicklistOptions>();

		for(Schema.SobjectType objType : Schema.getGlobalDescribe().values()){
                  
			Schema.DescribeSObjectResult sObjectResult = objType.getDescribe();

			if(sObjectResult.isQueryable() && sObjectResult.isUpdateable() && sObjectResult.isAccessible() && sObjectResult.isCreateable()){

				String name = sObjectResult.getName();
				if(!name.containsignorecase('share') && !name.containsignorecase('history') && !name.containsignorecase('feed') && !name.containsignorecase('tag')){
					 objectList.add(new PicklistOptions(sObjectResult.getLabel(), sObjectResult.getName(), ''));
				}
			}
		}
		objectList.sort();
		return objectList;
	}

	@AuraEnabled
	public static list<PicklistOptions> fetchFieldsList(String objName){

           list<PicklistOptions> fieldsList = new list<PicklistOptions>();

		   if(String.isNotBlank(objName)){

			 Map<String,Schema.SobjectField> fieldsMap = Schema.getGlobalDescribe().get(objName).getDescribe().fields.getMap();

			 for(String fieldName : fieldsMap.keyset()){

				 Schema.DescribeFieldResult field = fieldsMap.get(fieldName).getDescribe();


				 if(field.isAccessible() && field.isCreateable()){
					 
					 fieldsList.add(new PicklistOptions(field.getLabel(), field.getName(), PicklistOptions.apexTypeToJSType.get(String.valueOf(field.getType()))));
				 }
			 }
		   }

		   fieldsList.sort();

		   return fieldsList;
	}

	@AuraEnabled
public static PicklistOptions.ReturnWrapper fetchRecords(String objName, List<String> fieldsList, Integer pageNumber, Integer recordCount) {
    try {
        PicklistOptions.ReturnWrapper rt = new PicklistOptions.ReturnWrapper();

        if (String.isNotBlank(objName) && fieldsList != null && !fieldsList.isEmpty()) {

            Integer offset = (pageNumber - 1) * recordCount;

            String fieldStr = String.join(fieldsList, ',');
            String query = 'SELECT Id,' + fieldStr + ' FROM ' + objName + ' LIMIT ' + recordCount + ' OFFSET ' + offset;
            String count = 'SELECT COUNT() FROM ' + objName;

            rt.records = Database.query(query);
            rt.totalRecords = Database.countQuery(count);
        }

        return rt;
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
}






}