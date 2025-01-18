import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from '../../../model/category.model';
import { GraphqlService } from '../../../services/graphql.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  private subscription: Subscription = new Subscription();
  constructor(private graphService: GraphqlService) { }

  private readonly query = {
    query: `
      query {
        categories {
          id
          name
          image
        }
      }
    `
  };

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getCategories(): void {
    this.subscription.add(
      this.graphService.graphQuery(this.query).subscribe({
        next: (response) => {
          this.categories = response.data.categories;
        },
        error: (error) => {
          console.error('Error fetching categories:', error);
        }
      })
    );
  }
}
