package panoptiumtech.panoptium;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients /*Now Spring can see beans with OpenFeign*/
public class PanoptiumApplication {

	public static void main(String[] args) {
		SpringApplication.run(PanoptiumApplication.class, args);
	}

}
