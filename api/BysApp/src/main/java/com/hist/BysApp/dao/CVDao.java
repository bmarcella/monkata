/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.hist.BysApp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.hist.BysApp.entities.paiement.CycleVersement;
import com.hist.BysApp.entities.paiement.OPaie;
import com.hist.BysApp.entities.paiement.Versement;

@CrossOrigin("*")
@RepositoryRestResource
public interface CVDao extends JpaRepository<CycleVersement, Long> {
	
	CycleVersement findByCode( String code);
	
}
