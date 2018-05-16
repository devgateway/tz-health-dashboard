package org.devgateway.rdi.tanzania.controllers;

import org.devgateway.rdi.tanzania.exception.RecordNotFoundException;
import org.devgateway.rdi.tanzania.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * @author Sebastian Dimunzio
 */
@Controller
public class ExceptionController {


    @ResponseStatus(value = HttpStatus.CONFLICT,
            reason = "Can't find requested records")  // 409
    @ExceptionHandler(Exception.class)
    public ErrorResponse conflict() {
        return new ErrorResponse();
    }


    @RequestMapping(value="/error", method= RequestMethod.GET)
    public String handleMyExceptionOnRedirect(String error) {
        return error;
    }
}
