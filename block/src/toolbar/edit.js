/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import {
	AlignmentControl,
	BlockControls,
	InspectorControls,
	useBlockProps,
	HeadingLevelDropdown,
	useBlockEditingMode,
} from '@wordpress/block-editor';
import { ToggleControl, TextControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEntityProp} from '@wordpress/core-data';

export default function PostTitleEdit( {
	                                       attributes: { level, textAlign, isLink, rel, linkTarget },
	                                       setAttributes,
	                                       context: { postType, postId, queryId },
	                                       insertBlocksAfter,
                                       } ) {
	const TagName = level === 0 ? 'p' : `h${ level }`;

	const [ rawTitle = '', setTitle, fullTitle ] = useEntityProp(
		'postType',
		postType,
		'title',
		postId
	);

	const {meta} = wp.data.select('core').getEntityRecord('postType', postType, postId);

	let postTitle = meta.short_title? meta.short_title : fullTitle?.rendered;

	const blockProps = useBlockProps( {
		className: clsx( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
	} );
	const blockEditingMode = useBlockEditingMode();

	let titleElement = <TagName { ...blockProps }>{ __( 'Title' ) }</TagName>;

	if ( postType && postId ) {
		titleElement =
			<>
				<TagName
					{ ...blockProps }
					dangerouslySetInnerHTML={ { __html: postTitle} }
				/>
			</>
	}


	return (
		<>
			{ blockEditingMode === 'default' && (
				<>
					<BlockControls group="block">
						<HeadingLevelDropdown
							value={ level }
							onChange={ ( newLevel ) =>
								setAttributes( { level: newLevel } )
							}
						/>
						<AlignmentControl
							value={ textAlign }
							onChange={ ( nextAlign ) => {
								setAttributes( { textAlign: nextAlign } );
							} }
						/>
					</BlockControls>
					<InspectorControls>
						<PanelBody title={ __( 'Settings' ) }>
							<ToggleControl
								__nextHasNoMarginBottom
								label={ __( 'Make title a link' ) }
								onChange={ () =>
									setAttributes( { isLink: ! isLink } )
								}
								checked={ isLink }
							/>
							{ isLink && (
								<>
									<ToggleControl
										__nextHasNoMarginBottom
										label={ __( 'Open in new tab' ) }
										onChange={ ( value ) =>
											setAttributes( {
												linkTarget: value
													? '_blank'
													: '_self',
											} )
										}
										checked={ linkTarget === '_blank' }
									/>
									<TextControl
										__nextHasNoMarginBottom
										label={ __( 'Link rel' ) }
										value={ rel }
										onChange={ ( newRel ) =>
											setAttributes( { rel: newRel } )
										}
									/>
								</>
							) }
						</PanelBody>
					</InspectorControls>
				</>
			) }
			{ titleElement }
		</>
	);
}
