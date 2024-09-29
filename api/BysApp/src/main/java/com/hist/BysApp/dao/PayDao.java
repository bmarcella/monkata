/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.hist.BysApp.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.hist.BysApp.entities.member.UserEntity;
import com.hist.BysApp.entities.paiement.Payment;

@CrossOrigin("*")
@RepositoryRestResource
public interface PayDao extends JpaRepository<Payment, Long> {
    @Query("SELECT p FROM Payment p WHERE p.id=:id")
	Payment getPayment(@Param("id") Long state);
    
    @Query("SELECT p FROM Payment p WHERE p.pay_by=:id ORDER BY p.id DESC")
   	Page<Payment> getPaymentForUser(Pageable paging,@Param("id") Long state);
    
    @Query("SELECT COUNT (p) FROM Payment WHERE  code_etudiant=:code GROUP BY code_etudiant ")
    Long getSizePaiement(@Param("code") String code );
    
    @Query("SELECT p FROM Payment p WHERE code_etudiant=:code AND promotion=:promo ORDER BY p.id DESC")
   	List<Payment> getPaymentForUserByPromo(@Param("code") String code, @Param("promo") String promo);
    
}
