import { Component } from '@angular/core';
import {ConfigurationFileGeneratorService} from "../../_services/configuration-file-generator.service";

@Component({
  selector: 'app-configuration-generator',
  templateUrl: './configuration-generator.component.html',
  styleUrls: ['./configuration-generator.component.css']
})
export class ConfigurationGeneratorComponent {

  number: number;

  constructor(private configurationFileGeneratorService: ConfigurationFileGeneratorService) {
  }

  generateConfigurationFile() {
    this.configurationFileGeneratorService.generateConfigurationByNumber(this.number).subscribe(data => {
      console.log("OK")
    })
  }

}
