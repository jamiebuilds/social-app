import React from 'react'
import {StyleSheet, View} from 'react-native'
import {AppBskyGraphDefs, RichText} from '@atproto/api'
import {Link} from '../util/Link'
import {Text} from '../util/text/Text'
import {RichText as RichTextCom} from '../util/text/RichText'
import {UserAvatar} from '../util/UserAvatar'
import {s} from 'lib/styles'
import {usePalette} from 'lib/hooks/usePalette'
import {sanitizeDisplayName} from 'lib/strings/display-names'
import {
  getProfileViewBasicLabelInfo,
  getProfileModeration,
} from 'lib/labeling/helpers'
import {ModerationBehaviorCode} from 'lib/labeling/types'

export const ListCard = ({
  testID,
  list,
  noBg,
  noBorder,
  renderButton,
}: {
  testID?: string
  list: AppBskyGraphDefs.ListView
  noBg?: boolean
  noBorder?: boolean
  renderButton?: () => JSX.Element
}) => {
  const pal = usePalette('default')

  const descriptionRichText = React.useMemo(() => {
    if (list.description) {
      return new RichText({
        text: list.description,
        facets: list.descriptionFacets,
      })
    }
    return undefined
  }, [list])

  return (
    <Link
      testID={testID}
      style={[
        styles.outer,
        pal.border,
        noBorder && styles.outerNoBorder,
        !noBg && pal.view,
      ]}
      href={`/profile/${'list.author'}/lists/${'list.rkey'}`}
      title={list.name}
      asAnchor
      anchorNoUnderline>
      <View style={styles.layout}>
        <View style={styles.layoutAvi}>
          <UserAvatar size={40} avatar={list.avatar} />
        </View>
        <View style={styles.layoutContent}>
          <Text
            type="lg"
            style={[s.bold, pal.text]}
            numberOfLines={1}
            lineHeight={1.2}>
            {sanitizeDisplayName(list.name)}
          </Text>
          <Text type="md" style={[pal.textLight]} numberOfLines={1}>
            {list.purpose === 'app.bsky.graph.defs#blocklist' && 'Block list'}{' '}
            by @TODO
          </Text>
          {!!list.viewer?.blocked && (
            <View style={s.flexRow}>
              <View style={[s.mt5, pal.btn, styles.pill]}>
                <Text type="xs" style={pal.text}>
                  Subscribed
                </Text>
              </View>
            </View>
          )}
        </View>
        {renderButton ? (
          <View style={styles.layoutButton}>{renderButton()}</View>
        ) : undefined}
      </View>
      {descriptionRichText ? (
        <View style={styles.details}>
          <RichTextCom
            style={pal.text}
            numberOfLines={20}
            richText={descriptionRichText}
          />
        </View>
      ) : undefined}
    </Link>
  )
}

const styles = StyleSheet.create({
  outer: {
    borderTopWidth: 1,
    paddingHorizontal: 6,
  },
  outerNoBorder: {
    borderTopWidth: 0,
  },
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  layoutAvi: {
    width: 54,
    paddingLeft: 4,
    paddingTop: 8,
    paddingBottom: 10,
  },
  avi: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  layoutContent: {
    flex: 1,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  layoutButton: {
    paddingRight: 10,
  },
  details: {
    paddingLeft: 54,
    paddingRight: 10,
    paddingBottom: 10,
  },
  pill: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  btn: {
    paddingVertical: 7,
    borderRadius: 50,
    marginLeft: 6,
    paddingHorizontal: 14,
  },

  followedBy: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 54,
    paddingRight: 20,
    marginBottom: 10,
    marginTop: -6,
  },
  followedByAviContainer: {
    width: 24,
    height: 36,
  },
  followedByAvi: {
    width: 36,
    height: 36,
    borderRadius: 18,
    padding: 2,
  },
  followsByDesc: {
    flex: 1,
    paddingRight: 10,
  },
})
