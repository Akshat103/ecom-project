import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GraphqlService } from '../services/graphql.service';
import { Subscription } from 'rxjs';

interface Product {
  id: number,
  title: string,
  price: number
  description: string,
  images: string[]
}

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {
  searchQuery: string | null = null;
  products: Product[] = [];
  private subscription: Subscription = new Subscription();

  isLoading = false;

  constructor(private route: ActivatedRoute, private graphService: GraphqlService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams.subscribe(params => {
        this.searchQuery = params['q'];

        if (this.searchQuery) {
          const query = {
            query: `
              query {
                products(title: "${this.searchQuery.toLocaleLowerCase()}") {
                  id
                  title
                  price
                  description
                  images
                }
              }
            `
          };
          
          this.isLoading = true;
          this.subscription.add(
            this.graphService.graphQuery(query).subscribe({
              next: (response) => {
                this.products = response.data.products;
                this.isLoading = false;
              },
              error: (error) => {
                console.error('Error fetching products:', error);
              }
            })
          );
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
