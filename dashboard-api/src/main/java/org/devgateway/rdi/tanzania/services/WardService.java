package org.devgateway.rdi.tanzania.services;

import com.vividsolutions.jts.geom.Geometry;
import org.devgateway.rdi.tanzania.domain.Ward;
import org.devgateway.rdi.tanzania.repositories.WardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;

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


    public void findContains(Geometry geometry){

    }

}
