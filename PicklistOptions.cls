public class PicklistOptions implements Comparable{
	
	@AuraEnabled
	public string label,value,datatype;

     public PicklistOptions (String label, String value, String datatype){
		this.label = label;
		this.value = value;
		this.datatype = datatype;
	 }

	 public Integer compareTo(Object obj) {

	     return label.compareTo(((PicklistOptions) obj).label); 
    }

    public class ReturnWrapper {
           @AuraEnabled public list<Sobject> records;
		   @AuraEnabled public Integer totalRecords;  
	}

	public static Map<String, String> apexTypeToJSType = new Map<String, String> {
			'ADDRESS' => 'text',
			'ID' => 'text',
			'TEXTAREA' => 'text',
			'STRING' => 'text',
			'REFERENCE' => 'text',
			'PICKLIST' => 'text',
			'MULTIPICKLIST' => 'text',
			'DATE' => 'date',
			'DOUBLE' => 'number',
			'PERCENT' => 'percent',
			'PHONE' => 'phone',
			'URL' => 'url',
			'INTEGER' => 'number',
			'CURRENCY' => 'currency',
			'DATETIME' => 'date',
			'BOOLEAN' => 'boolean',
			'EMAIL' => 'email'
  };

}