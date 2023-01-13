package com.seqr.api;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

@Path("/hello")
public class SeQRService {
	@GET
	@Path("/{name}")
	public Response getMsg(@PathParam("name") String name) {

		String output = "Welcome   : " + name;
		System.out.println(name);

		return Response.status(200).entity(output).build();
	}
}
