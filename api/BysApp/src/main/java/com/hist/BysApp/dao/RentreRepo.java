/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.hist.BysApp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.hist.BysApp.entities.grade.Document;
import com.hist.BysApp.entities.grade.Domaine;
@CrossOrigin("*")
@RepositoryRestResource
public interface RentreRepo extends JpaRepository<Document,String> {
    public Document findByCode(String code);
    Boolean existsByCode(String code);
}
