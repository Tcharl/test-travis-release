package io.github.jhipster.sample.service;

import java.time.LocalDate;
import java.math.BigDecimal;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import io.github.jhipster.sample.domain.BankAccount;
import io.github.jhipster.sample.domain.*; // for static metamodels
import io.github.jhipster.sample.repository.BankAccountRepository;
import io.github.jhipster.sample.service.dto.BankAccountCriteria;

import io.github.jhipster.sample.service.dto.BankAccountDTO;
import io.github.jhipster.sample.service.mapper.BankAccountMapper;
import io.github.jhipster.sample.domain.enumeration.BankAccountType;

/**
 * Service for executing complex queries for BankAccount entities in the database.
 * The main input is a {@link BankAccountCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link BankAccountDTO} or a {@link Page} of {@link BankAccountDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class BankAccountQueryService extends QueryService<BankAccount> {

    private final Logger log = LoggerFactory.getLogger(BankAccountQueryService.class);


    private final BankAccountRepository bankAccountRepository;

    private final BankAccountMapper bankAccountMapper;

    public BankAccountQueryService(BankAccountRepository bankAccountRepository, BankAccountMapper bankAccountMapper) {
        this.bankAccountRepository = bankAccountRepository;
        this.bankAccountMapper = bankAccountMapper;
    }

    /**
     * Return a {@link List} of {@link BankAccountDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<BankAccountDTO> findByCriteria(BankAccountCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<BankAccount> specification = createSpecification(criteria);
        return bankAccountMapper.toDto(bankAccountRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link BankAccountDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<BankAccountDTO> findByCriteria(BankAccountCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<BankAccount> specification = createSpecification(criteria);
        final Page<BankAccount> result = bankAccountRepository.findAll(specification, page);
        return result.map(bankAccountMapper::toDto);
    }

    /**
     * Function to convert BankAccountCriteria to a {@link Specifications}
     */
    private Specifications<BankAccount> createSpecification(BankAccountCriteria criteria) {
        Specifications<BankAccount> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), BankAccount_.id));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), BankAccount_.name));
            }
            if (criteria.getBankNumber() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getBankNumber(), BankAccount_.bankNumber));
            }
            if (criteria.getAgencyNumber() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getAgencyNumber(), BankAccount_.agencyNumber));
            }
            if (criteria.getLastOperationDuration() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getLastOperationDuration(), BankAccount_.lastOperationDuration));
            }
            if (criteria.getMeanOperationDuration() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getMeanOperationDuration(), BankAccount_.meanOperationDuration));
            }
            if (criteria.getBalance() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getBalance(), BankAccount_.balance));
            }
            if (criteria.getOpeningDay() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getOpeningDay(), BankAccount_.openingDay));
            }
            if (criteria.getLastOperationDate() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getLastOperationDate(), BankAccount_.lastOperationDate));
            }
            if (criteria.getActive() != null) {
                specification = specification.and(buildSpecification(criteria.getActive(), BankAccount_.active));
            }
            if (criteria.getAccountType() != null) {
                specification = specification.and(buildSpecification(criteria.getAccountType(), BankAccount_.accountType));
            }
            if (criteria.getUserId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getUserId(), BankAccount_.user, User_.id));
            }
            if (criteria.getOperationId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getOperationId(), BankAccount_.operations, Operation_.id));
            }
        }
        return specification;
    }

}
