package dto;

import java.util.Date;

import javax.persistence.Column;

import lombok.Data;
@Data
public class ChangeName {
	
	
	    private Long id;
	    private String pnom;
	    private String nom;
	    private String  code;
		public ChangeName() {
			super();
		}

}
