package io.github.jhipster.sample.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache("users", jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.BankAccount.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.BankAccount.class.getName() + ".operations", jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.Label.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.Label.class.getName() + ".operations", jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.Operation.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.Operation.class.getName() + ".labels", jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.FieldTestEntity.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.FieldTestPagerEntity.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.FieldTestMapstructEntity.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.FieldTestServiceImplEntity.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.FieldTestInfiniteScrollEntity.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.FieldTestServiceClassEntity.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.FieldTestPaginationEntity.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.EntityWithDTO.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.EntityWithServiceClass.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.EntityWithServiceImpl.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.EntityWithPagination.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.EntityWithServiceClassAndPagination.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.EntityWithServiceImplAndPagination.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.EntityWithServiceClassAndDTO.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.EntityWithServiceImplAndDTO.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.EntityWithPaginationAndDTO.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.EntityWithServiceClassPaginationAndDTO.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.sample.domain.EntityWithServiceImplPaginationAndDTO.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
