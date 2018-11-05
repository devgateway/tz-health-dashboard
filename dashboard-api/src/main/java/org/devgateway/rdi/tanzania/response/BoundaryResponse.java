package org.devgateway.rdi.tanzania.response;

/**
 * @author Sebastian Dimunzio
 */

public class BoundaryResponse {

    Long gid;
    String name;

    public Long getGid() {
        return gid;
    }

    public void setGid(Long gid) {
        this.gid = gid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BoundaryResponse() {
    }

    public BoundaryResponse(Long gid, String name) {
        this.gid = gid;
        this.name = name;
    }
}
