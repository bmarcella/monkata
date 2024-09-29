package com.hist.BysApp.Response;

import java.util.List;

import com.hist.BysApp.entities.paiement.PVersement;

import lombok.Data;

@Data
public class RPayment {

	Long id_payment;
	double remain;
	List<PVersement> pv;
}
