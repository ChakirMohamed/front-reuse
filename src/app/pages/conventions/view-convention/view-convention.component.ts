import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConventionService } from '../../../services/convention.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-convention',
  templateUrl: './view-convention.component.html',
  styleUrls: ['./view-convention.component.scss']
})
export class ViewConventionComponent implements OnInit {
  convention: any = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private conventionService: ConventionService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadConvention(id);
      } else {
        this.toastr.error('Convention ID not provided', 'Error');
        this.router.navigate(['/conventions']);
      }
    });
  }

  loadConvention(id: string): void {
    this.isLoading = true;
    this.conventionService.getConventionById(Number(id)).subscribe(
      (data) => {
        this.convention = data;
        this.isLoading = false;
      },
      (error) => {
        this.toastr.error('Erreur lors du chargement de la convention', 'Erreur');
        this.isLoading = false;
        this.goBack();
      }
    );
  }

  editConvention(): void {
    this.router.navigate(['/conventions/edit', this.convention.id]);
  }

  goBack(): void {
    this.router.navigate(['/conventions']);
  }
}
