import React from 'react';
import Catalogue from '../../lib/interfaces/catalogue';
import CatalogueItem from './CatalogueItem';

type Props = {
  catalogues: Catalogue[];
  onItemClicked: (catalogueId: number) => void;
};

export default function CatalogueList({ catalogues, onItemClicked }: Props) {
  return (
    <>
      {catalogues.length > 0 ? (
        catalogues.map(catalogue => {
          return <CatalogueItem catalogue={catalogue} key={catalogue.id} onClick={onItemClicked} />;
        })
      ) : (
        <h4>No Catalogues To Show</h4>
      )}
    </>
  );
}
