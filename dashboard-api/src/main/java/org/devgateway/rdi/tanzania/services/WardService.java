package org.devgateway.rdi.tanzania.services;

import org.devgateway.rdi.tanzania.domain.Ward;
import org.devgateway.rdi.tanzania.repositories.WardGeoRepository;
import org.devgateway.rdi.tanzania.repositories.WardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Sebastian Dimunzio
 */

@Service
public class WardService {
    @Autowired
    WardRepository wardRepository;

    public Ward getWardById(final Long id) {
        Ward ward = null;
        if (id != null) {
            ward = wardRepository.findOne(id);
        }
        return ward;
    }

}
