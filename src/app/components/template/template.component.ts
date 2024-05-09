import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})
export class TemplateComponent implements OnInit {
  htmlContent: SafeHtml = '';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const apiUrl = 'http://localhost:5149/api/Templates/template1.html';
    this.http.get(apiUrl, {responseType:'text'}).subscribe(
      (response: string) => {
        this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(response);;
      },
      (error) => {
        console.error('Error fetching HTML content:', error);
      }
    );
  }

}
